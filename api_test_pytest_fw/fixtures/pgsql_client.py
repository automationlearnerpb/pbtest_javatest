from typing import Optional
from typing import Any
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import pytest

"""
/c:/DAI/githubRepo/pbtest_javatest/api_test_pytest_fw/fixtures/pgsql_client.py

Simple Postgres client helper. Provides:
 - PgClient: a small context-manager wrapper around psycopg2 connection
 - create_connection: convenience function
 - pytest fixture `pg_client` that reads connection info from environment variables:
    PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DB
"""

class PgClient:
    """Context manager for a psycopg2 connection.

    Usage:
       with PgClient(host, port, user, password, dbname) as client:
          cur = client.cursor()
          cur.execute("SELECT 1")
          rows = cur.fetchall()
    """

    def __init__(
       self,
       host: str,
       port: int,
       user: str,
       password: str,
       dbname: str = "postgres",
       connect_timeout: int = 10,
    ):
       self.host = host
       self.port = int(port)
       self.user = user
       self.password = password
       self.dbname = dbname
       self.connect_timeout = connect_timeout
       self._conn: Optional[psycopg2.extensions.connection] = None

    def connect(self) -> psycopg2.extensions.connection:
       if self._conn and not self._conn.closed:
          return self._conn
       self._conn = psycopg2.connect(
          host=self.host,
          port=self.port,
          user=self.user,
          password=self.password,
          dbname=self.dbname,
          connect_timeout=self.connect_timeout,
       )
       return self._conn

    def cursor(self, dict_cursor: bool = True):
       conn = self.connect()
       if dict_cursor:
          return conn.cursor(cursor_factory=RealDictCursor)
       return conn.cursor()

    def commit(self):
       if self._conn and not self._conn.closed:
          self._conn.commit()

    def rollback(self):
       if self._conn and not self._conn.closed:
          self._conn.rollback()

    def close(self):
       if self._conn and not self._conn.closed:
          try:
             self._conn.close()
          finally:
             self._conn = None

    # Context manager support
    def __enter__(self):
       self.connect()
       return self

    def __exit__(self, exc_type, exc, tb):
       if exc_type:
          try:
             self.rollback()
          except Exception:
             pass
       else:
          try:
             self.commit()
          except Exception:
             pass
       self.close()

    def execute_query(
        self,
        query: str,
        params: Optional[Any] = None,
        dict_cursor: bool = True        
    ):
        
        cur = self.cursor(dict_cursor=dict_cursor)
        print("Executing query:", query)
        print("With params:", params)
        print("Cursor:", cur)
        cur.execute(query, params)
        # If there's no description the statement didn't return rows (INSERT/UPDATE/DELETE)
        if cur.description is None:
            return cur.rowcount
        return cur.fetchall()



def create_connection(host: str, port: int, user: str, password: str, dbname: str = "postgres") -> psycopg2.extensions.connection:
    """Convenience: return a raw psycopg2 connection."""
    client = PgClient(host=host, port=port, user=user, password=password, dbname=dbname)
    return client.connect()

