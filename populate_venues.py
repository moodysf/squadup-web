import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 1. SETUP
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
batch = db.batch()
batch_count = 0

def add_to_batch(doc_ref, data):
    global batch, batch_count
    batch.set(doc_ref, data)
    batch_count += 1
    if batch_count >= 400:
        batch.commit()
        batch = db.batch()
        batch_count = 0
        print("   --- Committed batch ---")

print("🌱 Seeding Curated GTA Venues...")

# 2. THE MASTER LIST (Top Venues Only)
venues = [
    # --- TORONTO (DOWNTOWN/EAST/WEST) ---
    {"id": "to_1", "name": "Cherry Beach Sports Fields", "sport": "Soccer", "address": "275 Unwin Ave, Toronto, ON", "img": "soccerball"},
    {"id": "to_2", "name": "Regent Park Athletic Grounds", "sport": "Soccer", "address": "480 Shuter St, Toronto, ON", "img": "soccerball"},
    {"id": "to_3", "name": "Eglinton Flats", "sport": "Soccer", "address": "3601 Eglinton Ave W, Toronto, ON", "img": "soccerball"},
    {"id": "to_4", "name": "Sunnybrook Park", "sport": "Soccer", "address": "1132 Leslie St, Toronto, ON", "img": "soccerball"},
    {"id": "to_5", "name": "Christie Pits Park", "sport": "Basketball", "address": "750 Bloor St W, Toronto, ON", "img": "basketball"},
    {"id": "to_6", "name": "Underpass Park", "sport": "Basketball", "address": "29 Lower River St, Toronto, ON", "img": "basketball"},
    {"id": "to_7", "name": "Mattamy Athletic Centre", "sport": "Hockey", "address": "50 Carlton St, Toronto, ON", "img": "hockey.puck"},
    {"id": "to_8", "name": "Scotiabank Pond", "sport": "Hockey", "address": "57 Carl Hall Rd, Toronto, ON", "img": "hockey.puck"},
    {"id": "to_9", "name": "Withrow Park", "sport": "Hockey", "address": "725 Logan Ave, Toronto, ON", "img": "hockey.puck"},
    {"id": "to_10", "name": "High Park Tennis Club", "sport": "Tennis", "address": "1873 Bloor St W, Toronto, ON", "img": "tennisball"},
    {"id": "to_11", "name": "Trinity Bellwoods Park", "sport": "Tennis", "address": "790 Queen St W, Toronto, ON", "img": "tennisball"},
    {"id": "to_12", "name": "Downsview Park", "sport": "Soccer", "address": "35 Carl Hall Rd, Toronto, ON", "img": "soccerball"},
    {"id": "to_13", "name": "Lamport Stadium", "sport": "Soccer", "address": "1155 King St W, Toronto, ON", "img": "soccerball"},
    {"id": "to_14", "name": "Varsity Stadium", "sport": "Soccer", "address": "299 Bloor St W, Toronto, ON", "img": "soccerball"},
    {"id": "to_15", "name": "Monarch Park Stadium", "sport": "Soccer", "address": "1 Parkmount Rd, Toronto, ON", "img": "soccerball"},

    # --- MISSISSAUGA ---
    {"id": "mis_1", "name": "Paramount Fine Foods Centre", "sport": "Soccer", "address": "5500 Rose Cherry Pl, Mississauga, ON", "img": "soccerball"},
    {"id": "mis_2", "name": "Iceland Mississauga", "sport": "Hockey", "address": "705 Matheson Blvd E, Mississauga, ON", "img": "hockey.puck"},
    {"id": "mis_3", "name": "Hershey Centre Fields", "sport": "Basketball", "address": "5600 Rose Cherry Pl, Mississauga, ON", "img": "basketball"},
    {"id": "mis_4", "name": "Mississauga Valley Community Centre", "sport": "Tennis", "address": "1275 Mississauga Valley Blvd, Mississauga, ON", "img": "tennisball"},
    {"id": "mis_5", "name": "Churchill Meadows Community Centre", "sport": "Soccer", "address": "5320 Ninth Line, Mississauga, ON", "img": "soccerball"},
    {"id": "mis_6", "name": "Courtneypark Athletic Fields", "sport": "Soccer", "address": "600 Courtneypark Dr W, Mississauga, ON", "img": "soccerball"},

    # --- BRAMPTON ---
    {"id": "bram_1", "name": "Save Max Sports Centre", "sport": "Soccer", "address": "1495 Sandalwood Pkwy E, Brampton, ON", "img": "soccerball"},
    {"id": "bram_2", "name": "CAA Centre", "sport": "Hockey", "address": "7575 Kennedy Rd S, Brampton, ON", "img": "hockey.puck"},
    {"id": "bram_3", "name": "Creditview Sandalwood Park", "sport": "Soccer", "address": "10530 Creditview Rd, Brampton, ON", "img": "soccerball"},
    {"id": "bram_4", "name": "Gore Meadows Community Centre", "sport": "Basketball", "address": "10150 The Gore Rd, Brampton, ON", "img": "basketball"},

    # --- VAUGHAN / MARKHAM / RICHMOND HILL ---
    {"id": "vau_1", "name": "The Hangar Sport Events Centre", "sport": "Soccer", "address": "75 Carl Hall Rd, North York, ON", "img": "soccerball"},
    {"id": "vau_2", "name": "Zanchin Automotive Soccer Centre", "sport": "Soccer", "address": "7601 Martin Grove Rd, Vaughan, ON", "img": "soccerball"},
    {"id": "mark_1", "name": "Markham Pan Am Centre", "sport": "Volleyball", "address": "16 Main St Unionville, Markham, ON", "img": "volleyball"},
    {"id": "mark_2", "name": "Angus Glen Community Centre", "sport": "Tennis", "address": "3990 Major Mackenzie Dr E, Markham, ON", "img": "tennisball"},
    {"id": "rich_1", "name": "Richmond Green Sports Centre", "sport": "Soccer", "address": "1300 Elgin Mills Rd E, Richmond Hill, ON", "img": "soccerball"},
    {"id": "rich_2", "name": "Elvis Stojko Arena", "sport": "Hockey", "address": "350 16th Ave, Richmond Hill, ON", "img": "hockey.puck"},
]

# 3. UPLOAD
for v in venues:
    doc_ref = db.collection("pending_venues").document(v["id"])
    venue_data = {
        "name": v["name"],
        "sport": v["sport"],
        "address": v["address"],
        "imageName": v["img"],
        "status": "pending",
        "source": "Manual_GTA_Seed"
    }
    add_to_batch(doc_ref, venue_data)
    print(f"   Queued: {v['name']}")

batch.commit()
print(f"✅ SUCCESS: {len(venues)} Major GTA Venues added to 'pending_venues'.")
