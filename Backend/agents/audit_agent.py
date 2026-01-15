from datetime import datetime


def audit_agent(official_record: dict, citizen_evidence: dict):
    """
    Compares official record vs citizen evidence.

    Returns audit report JSON:
    - issues_found
    - severity_level
    - mismatch_type
    """

    issues = []

    official_status = official_record.get("status", "Unknown")
    budget = official_record.get("budget", 0)

    issue_type = citizen_evidence.get("issue_type", "Unknown")
    severity = citizen_evidence.get("severity", "Low")

    official_area = official_record.get("location", {}).get("area", "")
    citizen_area = citizen_evidence.get("location", {}).get("area", "")

    # Rule 1: Completed but damage exists
    # Rule 1B: Ongoing but medium/high issue exists (Suspect case)
    if official_status.lower() == "ongoing" and severity in ["Medium", "High"]:
        issues.append(
            f"Project is Ongoing but citizen evidence shows {issue_type} ({severity}). Possible delay or quality concern."
        )


    # Rule 2: High budget but high severity issue exists
    if budget >= 2000000 and severity == "High":
        issues.append(
            f"High budget project (₹{budget}) still has major issue: {issue_type}."
        )

    # Rule 3: Location mismatch
    if citizen_area and official_area and citizen_area.lower() != official_area.lower():
        issues.append(
            f"Location mismatch: official area is '{official_area}' but evidence area is '{citizen_area}'."
        )

    # Determine severity level for audit output
    if not issues:
        severity_level = "None"
        mismatch_type = "No Issues"
    else:
        if severity == "High":
            severity_level = "High"
            mismatch_type = "Quality Issue / Incomplete Work"
        elif severity == "Medium":
            severity_level = "Medium"
            mismatch_type = "Possible Delay / Quality Concern"
        else:
            severity_level = "Low"
            mismatch_type = "Minor Issue"

    return {
        "issues_found": issues,
        "severity_level": severity_level,
        "mismatch_type": mismatch_type,
        "audit_timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
