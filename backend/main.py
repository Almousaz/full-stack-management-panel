# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import uvicorn


from routes.users import router as users_router
from routes.assets import router as asset_router
from routes.workorders import router as workorders_router
from routes.dashboard import router as dashboard_router
from routes.chart import router as chart_router


from db import (
    create_table,
    create_asset_table,
    create_workorder_table
)


load_dotenv()


app = FastAPI()


create_table()
create_asset_table()
create_workorder_table()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://frontend:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router)

app.include_router(asset_router)
app.include_router(workorders_router)
app.include_router(dashboard_router)
app.include_router(chart_router)


PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "127.0.0.1")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=HOST,
        port=PORT,
        reload=True
    )


print("Server running on:", HOST, PORT)
