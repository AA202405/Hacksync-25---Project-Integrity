import json
from pathlib import Path
from services.agentic_audit_service import run_full_audit

EVIDENCE_PATH = Path(__file__).resolve().parent / "data" / "sample_evidence.json"


def main():
    with open(EVIDENCE_PATH, "r", encoding="utf-8") as f:
        evidence_list = json.load(f)

    print("\n==============================")
    print("🏗️ PROJECT INTEGRITY - DEMO RUN")
    print("==============================\n")

    for ev in evidence_list:
        result = run_full_audit(ev)

        print("\n----------------------------------")
        print(f"Evidence ID: {ev['evidence_id']}")
        print("Final Verdict:", result["verdict"]["label"])
        print("Explanation:", result["verdict"]["explanation"])
        print("Marker Color:", result["map_marker"]["color"])

        # ✅ NEW: print full JSON output
     
        print(json.dumps(result, indent=2))

        print("----------------------------------\n")


if __name__ == "__main__":
    main()
