import pymssql
import asyncio
import os
from functools import partial

class DbHelper:
    def __init__(self):
        self.server = "sql.bsite.net"
        self.user = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.database = os.getenv("DB_NAME")

    def _get_connection(self):
        return pymssql.connect(
            server=self.server,
            user=self.user,
            password=self.password,
            database=self.database
        )

    async def execute_sp_async(self, sp_name: str, params: tuple = ()):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, partial(self._execute_sp_sync, sp_name, params))

    def _execute_sp_sync(self, sp_name: str, params: tuple):
        conn = None
        try:
            conn = self._get_connection()
            cursor = conn.cursor(as_dict=True)
            placeholders = ",".join(["%s"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            cursor.execute(sql, params)
            result_sets = []
            while True:
                if cursor.description:
                    rows = cursor.fetchall()
                    result_sets.append(rows)
                if not cursor.nextset():
                    break
            return result_sets
        except Exception as e:
            raise RuntimeError(f"Failed to execute stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                conn.close()

    async def executespupdate_async(self, sp_name: str, params: tuple = ()):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, partial(self._executespupdate_sync, sp_name, params))

    def _executespupdate_sync(self, sp_name: str, params: tuple):
        conn = None
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            placeholders = ",".join(["%s"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            cursor.execute(sql, params)
            conn.commit()
        except Exception as e:
            if conn:
                conn.rollback()
            raise RuntimeError(f"Failed to execute stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                conn.close()

    async def execute_delete_sp(self, sp_name: str, params: tuple = ()):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, partial(self._execute_delete_sync, sp_name, params))

    def _execute_delete_sync(self, sp_name: str, params: tuple):
        conn = None
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            placeholders = ", ".join(["%s"] * len(params))
            sql = f"EXEC {sp_name} {placeholders}"
            cursor.execute(sql, params)
            conn.commit()
            return cursor.rowcount
        except Exception as e:
            raise RuntimeError(f"Failed to execute delete stored procedure '{sp_name}': {e}")
        finally:
            if conn:
                conn.close()
