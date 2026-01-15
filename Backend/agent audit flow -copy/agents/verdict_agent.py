def verdict_agent(audit_output: dict):
    """
    Converts audit report into final verdict + explanation.
    """

    severity = audit_output.get("severity_level", "None")

    if severity == "None":
        label = "Compliant"
        explanation = "No mismatch found between official record and citizen evidence."
        color = "green"
    elif severity == "Low":
        label = "Suspect"
        explanation = "Minor issues detected. Project may require inspection."
        color = "yellow"
    elif severity == "Medium":
        label = "Suspect"
        explanation = "Moderate mismatch detected. Quality concerns possible."
        color = "yellow"
    else:
        label = "Non-Compliant"
        explanation = "High severity mismatch detected. Project likely has incomplete or poor-quality work."
        color = "red"

    return {
        "label": label,
        "explanation": explanation,
        "color": color
    }
