"""Encode Campus website backend package.

Register PyMySQL as the MySQLdb implementation so Django's ``mysql`` backend
works without needing the native ``mysqlclient`` build toolchain on Windows.
"""

import pymysql

pymysql.install_as_MySQLdb()

# Django's MySQL backend refuses to load unless the driver reports a
# mysqlclient version >= 2.2.1. Older PyMySQL builds mimic an ancient
# mysqlclient (1.4.6), so advertise a compatible version when needed.
try:  # pragma: no cover - trivial shim
    import MySQLdb  # this is PyMySQL, aliased by install_as_MySQLdb()

    if getattr(MySQLdb, "version_info", (0,)) < (2, 2, 1):
        MySQLdb.version_info = (2, 2, 7, "final", 0)
        MySQLdb.__version__ = "2.2.7"
except Exception:  # pragma: no cover
    pass
