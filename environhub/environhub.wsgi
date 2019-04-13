import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Environhub/environhub")

from app import app as application
application.secret_key = 'eurwgyfeiduhs1wr77dub,2bwicyfew3r2i4ekugihuw2w'