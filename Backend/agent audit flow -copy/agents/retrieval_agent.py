import json
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "data" / "official_db.json"


def load_official_db(db_path=DB_PATH):
    with open(db_path, "r", encoding="utf-8") as f:
        return json.load(f)


def retrieval_agent(query: dict, db_path=DB_PATH):
    """
    Input query example:
    { "project_id": "MH-RD-001" }
    OR
    { "area": "Andheri East" }

    Output:
    official record JSON or None
    """
    db = load_official_db(db_path)

    project_id = query.get("project_id")
    area = query.get("area")

    for record in db:
        if project_id and record.get("project_id") == project_id:
            return record

        if area and record.get("location", {}).get("area", "").lower() == area.lower():
            return record

    return None
