from fastapi import APIRouter
from db import get_conn

router = APIRouter(prefix="/chart", tags=["Chart"])


@router.get("/workorders")
def workorders_chart():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT strftime('%Y-%m', dueDate) AS month,
               COUNT(*) as total
        FROM workorders
        GROUP BY month
        ORDER BY month
    """)

    rows = cur.fetchall()
    conn.close()

    data = []

    for r in rows:
        data.append({
            "x": r["month"],
            "y": r["total"]
        })

    return [
        {
            "id": "WorkOrders",
            "data": data
        }
    ]


@router.get("/workorders/multi")
def workorders_multi_chart():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT 
            priority,
            strftime('%Y-%m', dueDate) AS month,
            COUNT(*) AS total
        FROM workorders
        WHERE priority IS NOT NULL AND priority != ''
        GROUP BY priority, month
        ORDER BY month
    """)

    rows = cur.fetchall()
    conn.close()

    chart = {}

    for r in rows:
        p = r["priority"]
        m = r["month"]
        t = r["total"]

        if p not in chart:
            chart[p] = []

        chart[p].append({"x": m, "y": t})

    result = []

    for priority, data in chart.items():
        result.append({
            "id": priority,
            "data": data
        })

    return result
