import aioodbc
from app.config import DATABASE_URL


class DbHelper:
    def __init__(self):
        if not DATABASE_URL:
            raise ValueError(
                "Database URL is not set in the environment variables ")
        self.dsn = DATABASE_URL

    async def get_connection(self):
        try:
            conn = await aioodbc.connect(dsn=self.dsn)
            return conn
        except Exception as e:
            raise RuntimeError(f"Failed to connect to database: {e}")

    async def execute_sp_async(self, sp_name: str, params: tuple = ()):
        conn = None
        try:
            conn = await self.get_connection()
            cursor = await conn.cursor()
            placeholders = ",".join(["?"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            await cursor.execute(sql, params)
            result_sets = []
            while True:
                if cursor.description:
                    columns = [col[0] for col in cursor.description]
                    rows = await cursor.fetchall()
                    result_sets.append([dict(zip(columns, row))
                                       for row in rows])
                has_next = await cursor.nextset()
                if not has_next:
                    break
            return result_sets
        except Exception as e:
            raise RuntimeError(
                f"Failed to execute stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                await conn.close()

    async def executespupdate_async(self, sp_name: str, params: tuple = ()):
        conn = await self.get_connection()
        try:
            cursor = await conn.cursor()
            placeholders = ",".join(["?"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            await cursor.execute(sql, params)
            res = await conn.commit()
        except Exception as e:
            await conn.rollback()
            raise RuntimeError(
                f"Failed to execute stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                await conn.close()
    async def execute_delete_sp(self, sp_name: str, params: tuple = ()):
        conn = None
        try:
            conn = await self.get_connection()
            cursor = await conn.cursor()
            placeholders = ", ".join(["?"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            await cursor.execute(sql, params)
            await conn.commit()
            return cursor.rowcount
        except Exception as e:
            raise RuntimeError(
            f"Failed to execute delete stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                await conn.close()