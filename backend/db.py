# db.py
import sqlite3
import os
from dotenv import load_dotenv


load_dotenv()

DB_NAME = f"/app/data/{os.getenv('DB_NAME')}"
print("Using database file:", DB_NAME)


def get_conn():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        email TEXT,
        phone TEXT,
        access TEXT
    )
    """)

    conn.commit()
    conn.close()


def create_asset_table():
    conn = get_conn()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS assets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assetName TEXT,
            assetTag TEXT,
            category TEXT,
            status TEXT,
            location TEXT
        )
    """)
    conn.commit()
    conn.close()


def create_workorder_table():
    conn = get_conn()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS workorders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            priority TEXT,
            assetId INTEGER,
            dueDate TEXT
        )
    """)
    conn.commit()
    conn.close()
