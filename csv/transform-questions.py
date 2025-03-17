import json
import csv

def clear_name(name):
    return name.replace(" ", "")

def clear_text(text):
    return text.replace("\n", " ")

def clear_part(part, clear_fn = clear_text):
    cleared_part = clear_fn(part).strip()

    if cleared_part:
        return ' ' + cleared_part
    
    return cleared_part

with open("ppla-2024.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    rows = []
    for row in reader:
        if row["L.p."] == "":
            rows[-1]["name"] += clear_part(row["NUMER"], clear_name)
            rows[-1]["text"] += clear_part(row["PYTANIE"])
            rows[-1]["q1"] += clear_part(row["ODP1"])
            rows[-1]["q2"] += clear_part(row["ODP2"])
            rows[-1]["q3"] += clear_part(row["ODP3"])
            rows[-1]["q4"] += clear_part(row["ODP4"])
        else:
            rows.append({
                "name": clear_name(row["NUMER"]),
                "text": clear_text(row["PYTANIE"]),
                "q1": clear_text(row["ODP1"]),
                "q2": clear_text(row["ODP2"]),
                "q3": clear_text(row["ODP3"]),
                "q4": clear_text(row["ODP4"])
            })

    data = {
        "general": [],
        "plane": [],
        "planning": [],
        "human": [],
        "meteorology": [],
        "navigation": [],
        "operational": [],
        "flight": [],
        "communication": [],
    }

    for row in rows:
        if row["name"].startswith("PL010") or row["name"].startswith("PL100") or row["name"].startswith("PL099"):
            data["general"].append(row)
        elif row["name"].startswith("PL020"):
            data["plane"].append(row)
        elif row["name"].startswith("PL030"):
            data["planning"].append(row)
        elif row["name"].startswith("PL040"):
            data["human"].append(row)
        elif row["name"].startswith("PL050"):
            data["meteorology"].append(row)
        elif row["name"].startswith("PL060"):
            data["navigation"].append(row)
        elif row["name"].startswith("PL070"):
            data["operational"].append(row)
        elif row["name"].startswith("PL080"):
            data["flight"].append(row)
        elif row["name"].startswith("PL090"):
            data["communication"].append(row)



    json.dump(data, open("ppla-2024.json", "w"), indent=2, ensure_ascii=False)