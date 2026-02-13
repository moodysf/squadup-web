import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta

# 1. SETUP
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

# Helper to create dates (Firestore Timestamps)
now = datetime.now()

leagues = [
    {
        "id": "jam_soccer_winter_2026",
        "name": "JAM Toronto: Indoor Turf 6s",
        "sport": "Soccer", # Matches SportType.soccer "Soccer"
        "season": "Winter 2026",
        "region": "Toronto, ON",
        "description": "Competitive indoor turf soccer at The Hangar. 6v6 format with certified referees.",
        "startDate": now + timedelta(days=14),
        "registrationDeadline": now + timedelta(days=7),
        "individualPrice": 185.00,
        "teamPrice": 1450.00,
        "teamIds": [],
        "freeAgentIds": [],
        "maxTeams": 12,
        "isActive": True
    },
    {
        "id": "hoopdome_bball_winter",
        "name": "HoopDome House League",
        "sport": "Basketball",
        "season": "Winter 2026",
        "region": "North York, ON",
        "description": "Premier basketball house league in the GTA. High-intensity play for seasoned athletes.",
        "startDate": now + timedelta(days=10),
        "registrationDeadline": now + timedelta(days=5),
        "individualPrice": 210.00,
        "teamPrice": 1800.00,
        "teamIds": [],
        "freeAgentIds": [],
        "maxTeams": 8,
        "isActive": True
    },
    {
        "id": "xtsc_soccer_saturday",
        "name": "XTSC: Lamport Saturdays",
        "sport": "Soccer",
        "season": "Winter 2026",
        "region": "Toronto, ON",
        "description": "Saturday night lights at Lamport Stadium. Casual but organized 7v7 play.",
        "startDate": now + timedelta(days=20),
        "registrationDeadline": now + timedelta(days=12),
        "individualPrice": 160.00,
        "teamPrice": 1300.00,
        "teamIds": [],
        "freeAgentIds": [],
        "maxTeams": 16,
        "isActive": True
    }
]

print("🚀 Seeding leagues into Firestore...")

for league in leagues:
    # Use .set() to overwrite existing or create new
    db.collection("leagues").document(league["id"]).set(league)
    print(f"✅ Synced: {league['name']}")

print("\n🎉 Success! All leagues now match the Swift 'League' model.")
