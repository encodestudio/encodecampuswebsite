"""Encode Campus website backend package.

Register PyMySQL as the MySQLdb implementation so Django's ``mysql`` backend
works without needing the native ``mysqlclient`` build toolchain on Windows.
"""

import pymysql

pymysql.install_as_MySQLdb()
