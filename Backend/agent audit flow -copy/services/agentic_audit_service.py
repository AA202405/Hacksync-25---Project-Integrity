from agents.retrieval_agent import retrieval_agent
from agents.audit_agent import audit_agent
from agents.verdict_agent import verdict_agent


def run_full_audit(citizen_evidence: dict):
    """
    Full agentic audit workflow:
    1) Retrieve official record
    2) Audit mismatch
    3) Generate verdict

    Returns final JSON result (merge-safe for UI later).
    """

    project_id = citizen_evidence.get("project_id")

    official_record = retrieval_agent({"project_id": project_id})

    if not official_record:
        return {
            "error": True,
            "message": f"No official record found for project_id={project_id}"
        }

    audit_output = audit_agent(official_record, citizen_evidence)
    verdict_output = verdict_agent(audit_output)

    return {
        "project_id": project_id,
        "official_record": official_record,
        "citizen_evidence": citizen_evidence,
        "audit_summary": audit_output,
        "verdict": verdict_output,
        "map_marker": {
            "lat": official_record["location"]["lat"],
            "lng": official_record["location"]["lng"],
            "color": verdict_output["color"]
        }
    }
