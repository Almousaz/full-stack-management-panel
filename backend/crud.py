
from db import get_conn
from schemas import UserCreate
from schemas import AssetCreate
from schemas import WorkOrderCreate
import sqlite3


def create_user(data: UserCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email = ?", (data.email,))
    if cur.fetchone():
        conn.close()
        return {"error": "Email already exists"}, 400

    cur.execute("""
        INSERT INTO users (name, age, email, phone, access)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data.name,
        data.age,
        data.email,
        data.phone,
        data.access
    ))

    conn.commit()
    conn.close()
    return {"message": "User created successfully"}, 201


def get_users():
    conn = get_conn()
    rows = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_user(user_id):
    conn = get_conn()
    row = conn.execute("SELECT * FROM users WHERE id = ?",
                       (user_id,)).fetchone()
    conn.close()

    if row:
        return dict(row), 200
    return {"error": "User not found"}, 404


def update_user(user_id, data: UserCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE id = ?", (user_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "User not found"}, 404

    cur.execute("""
        SELECT id FROM users WHERE email = ? AND id != ?
    """, (data.email, user_id))

    if cur.fetchone():
        conn.close()
        return {"error": "Email already exists"}, 400

    cur.execute("""
        UPDATE users
        SET name=?, age=?, email=?, phone=?, access=?
        WHERE id=?
    """, (
        data.name,
        data.age,
        data.email,
        data.phone,
        data.access,
        user_id
    ))

    conn.commit()
    conn.close()
    return {"message": "User updated successfully"}, 200


def delete_user(user_id):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE id = ?", (user_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "User not found"}, 404

    cur.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return {"message": "User deleted successfully"}, 200


def create_asset(data: AssetCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM assets WHERE assetTag = ?", (data.assetTag,))
    if cur.fetchone():
        conn.close()
        return {"error": "Asset tag already exists"}, 400

    cur.execute("""
        INSERT INTO assets (assetName, assetTag, category, status, location)
        VALUES (?,?,?,?,?)
    """, (
        data.assetName,
        data.assetTag,
        data.category,
        data.status,
        data.location
    ))

    conn.commit()
    conn.close()
    return {"message": "Asset created successfully"}, 201


def get_assets():
    conn = get_conn()
    rows = conn.execute("SELECT * FROM assets").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_asset(asset_id):
    conn = get_conn()
    row = conn.execute("SELECT * FROM assets WHERE id = ?",
                       (asset_id,)).fetchone()
    conn.close()
    if row:
        return dict(row), 200
    return {"error": "Asset not found"}, 404


def update_asset(asset_id, data: AssetCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM assets WHERE id = ?", (asset_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "Asset not found"}, 404

    cur.execute("""
        SELECT id FROM assets WHERE assetTag = ? AND id != ?
    """, (data.assetTag, asset_id))

    if cur.fetchone():
        conn.close()
        return {"error": "Asset tag already exists"}, 400

    cur.execute("""
        UPDATE assets
        SET assetName=?, assetTag=?, category=?, status=?, location=?
        WHERE id=?
    """, (
        data.assetName,
        data.assetTag,
        data.category,
        data.status,
        data.location,
        asset_id
    ))

    conn.commit()
    conn.close()
    return {"message": "Asset updated successfully"}, 200


def delete_asset(asset_id):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM assets WHERE id = ?", (asset_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "Asset not found"}, 404

    cur.execute("DELETE FROM assets WHERE id = ?", (asset_id,))
    conn.commit()
    conn.close()
    return {"message": "Asset deleted successfully"}, 200


def create_workorder(data: WorkOrderCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO workorders (title, description, priority, assetId, dueDate)
        VALUES (?,?,?,?,?)
    """, (
        data.title,
        data.description,
        data.priority,
        data.assetId,
        data.dueDate
    ))

    conn.commit()
    conn.close()
    return {"message": "Work order created successfully"}, 201


def get_workorders():
    conn = get_conn()
    rows = conn.execute("SELECT * FROM workorders").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_workorder(work_id):
    conn = get_conn()
    row = conn.execute(
        "SELECT * FROM workorders WHERE id = ?", (work_id,)).fetchone()
    conn.close()
    if row:
        return dict(row), 200
    return {"error": "Work order not found"}, 404


def update_workorder(work_id, data: WorkOrderCreate):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM workorders WHERE id = ?", (work_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "Work order not found"}, 404

    cur.execute("""
        UPDATE workorders
        SET title = ?,
            description = ?,
            priority = ?,
            assetId = ?,
            dueDate = ?
        WHERE id = ?
    """, (
        data.title,
        data.description,
        data.priority,
        data.assetId,
        data.dueDate,
        work_id
    ))

    conn.commit()
    conn.close()
    return {"message": "Work order updated successfully"}, 200


def delete_workorder(work_id):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT id FROM workorders WHERE id = ?", (work_id,))
    if not cur.fetchone():
        conn.close()
        return {"error": "Work order not found"}, 404

    cur.execute("DELETE FROM workorders WHERE id = ?", (work_id,))
    conn.commit()
    conn.close()
    return {"message": "Work order deleted successfully"}, 200


def get_counts():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) AS c FROM users")
    users = cur.fetchone()["c"]

    cur.execute("SELECT COUNT(*) AS c FROM assets")
    assets = cur.fetchone()["c"]

    cur.execute("SELECT COUNT(*) AS c FROM workorders")
    workorders = cur.fetchone()["c"]

    conn.close()

    return {
        "users": users,
        "assets": assets,
        "workorders": workorders
    }


def get_asset_categories():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT category, COUNT(*) as total
        FROM assets
        GROUP BY category
    """)

    rows = cur.fetchall()
    conn.close()

    result = []

    for r in rows:
        result.append({
            "id": r["category"],
            "label": r["category"],
            "value": r["total"]
        })

    return result
