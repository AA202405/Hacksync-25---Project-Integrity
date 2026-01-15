import json
from pathlib import Path

import streamlit as st
import folium
from streamlit_folium import st_folium

from folium.plugins import MarkerCluster, HeatMap

from services.agentic_audit_service import run_full_audit

# -----------------------------
# CONFIG
# -----------------------------
EVIDENCE_PATH = Path(__file__).resolve().parent / "data" / "sample_evidence.json"

st.set_page_config(page_title="Project Integrity Map", layout="wide")

st.title("🗺️ Project Integrity — Geospatial Visualization")
st.caption("Color-coded markers based on Agentic Audit Verdict (Green/Yellow/Red).")

# -----------------------------
# LOAD DATA
# -----------------------------
with open(EVIDENCE_PATH, "r", encoding="utf-8") as f:
    evidence_list = json.load(f)

# -----------------------------
# RUN AGENTIC AUDIT FOR EACH EVIDENCE
# -----------------------------
results = []
for ev in evidence_list:
    result = run_full_audit(ev)
    results.append(result)

# -----------------------------
# SIDEBAR CONTROLS
# -----------------------------
st.sidebar.header("⚙️ Map Controls")

all_verdicts = ["Compliant", "Suspect", "Non-Compliant"]
selected_verdicts = st.sidebar.multiselect(
    "Show projects with verdict:",
    all_verdicts,
    default=all_verdicts
)

show_heatmap = st.sidebar.checkbox("🔥 Show Heatmap Layer", value=True)
show_clusters = st.sidebar.checkbox("🧩 Enable Marker Clustering", value=True)

# -----------------------------
# FILTER RESULTS
# -----------------------------
filtered_results = [r for r in results if r["verdict"]["label"] in selected_verdicts]

st.sidebar.markdown("---")
st.sidebar.write(f"📌 Total Evidence Reports: **{len(results)}**")
st.sidebar.write(f"📍 Markers Displayed: **{len(filtered_results)}**")

# -----------------------------
# CREATE BASE MAP
# -----------------------------
default_lat = 19.0760
default_lng = 72.8777

m = folium.Map(location=[default_lat, default_lng], zoom_start=11)

# -----------------------------
# ADD LEGEND
# -----------------------------
legend_html = """
<div style="
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 180px;
    background-color: white;
    border: 2px solid #444;
    z-index: 9999;
    font-size: 14px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
">
<b>Legend</b><br>
<span style="color:green; font-weight:bold;">●</span> Compliant<br>
<span style="color:orange; font-weight:bold;">●</span> Suspect<br>
<span style="color:red; font-weight:bold;">●</span> Non-Compliant<br>
</div>
"""
m.get_root().html.add_child(folium.Element(legend_html))

# -----------------------------
# MARKER CLUSTER (OPTIONAL)
# -----------------------------
cluster_layer = None
if show_clusters:
    cluster_layer = MarkerCluster().add_to(m)

# -----------------------------
# ADD MARKERS
# -----------------------------
heatmap_points = []

for r in filtered_results:
    marker = r["map_marker"]
    verdict_label = r["verdict"]["label"]
    explanation = r["verdict"]["explanation"]
    pid = r["project_id"]

    official = r["official_record"]
    evidence = r["citizen_evidence"]

    project_name = official.get("project_name", "N/A")
    budget = official.get("budget", "N/A")
    status = official.get("status", "N/A")
    contractor = official.get("contractor", "N/A")

    area = official.get("location", {}).get("area", "N/A")
    city = official.get("location", {}).get("city", "N/A")

    issue_type = evidence.get("issue_type", "N/A")
    severity = evidence.get("severity", "N/A")
    timestamp = evidence.get("timestamp", "N/A")
    evidence_id = evidence.get("evidence_id", "N/A")

    # Heatmap points (more weight for higher severity)
    weight = 1
    if severity == "Medium":
        weight = 2
    elif severity == "High":
        weight = 3

    heatmap_points.append([marker["lat"], marker["lng"], weight])

    popup_text = f"""
    <div style="font-family: Arial; font-size: 13px; width: 280px;">
      <h4 style="margin-bottom: 5px;">🏗️ {project_name}</h4>

      <b>Project ID:</b> {pid}<br>
      <b>Area:</b> {area}, {city}<br><br>

      <b>Budget:</b> ₹{budget}<br>
      <b>Official Status:</b> {status}<br>
      <b>Contractor:</b> {contractor}<br><br>

      <b>Citizen Evidence:</b><br>
      • <b>Evidence ID:</b> {evidence_id}<br>
      • <b>Issue:</b> {issue_type}<br>
      • <b>Severity:</b> {severity}<br>
      • <b>Timestamp:</b> {timestamp}<br><br>

      <b>Verdict:</b> <span style="color:{marker['color']}; font-weight:bold;">{verdict_label}</span><br>
      <b>Reason:</b> {explanation}
    </div>
    """

    circle = folium.CircleMarker(
        location=[marker["lat"], marker["lng"]],
        radius=9,
        color=marker["color"],
        fill=True,
        fill_color=marker["color"],
        fill_opacity=0.9,
        popup=folium.Popup(popup_text, max_width=350)
    )

    if cluster_layer:
        circle.add_to(cluster_layer)
    else:
        circle.add_to(m)

# -----------------------------
# HEATMAP LAYER (OPTIONAL)
# -----------------------------
if show_heatmap and len(heatmap_points) > 0:
    HeatMap(heatmap_points).add_to(m)

# -----------------------------
# DISPLAY MAP
# -----------------------------
st.subheader("📍 Interactive Map Dashboard")
st_folium(m, width=1200, height=600)

# -----------------------------
# SHOW RESULTS
# -----------------------------
st.subheader("📌 Audit Results (Filtered)")
st.json(filtered_results)
