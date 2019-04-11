from flask import Flask, make_response, render_template
from flask_restful import Api, Resource, request
from connectors import getIssueSummary, getIssueOverTime
from connectors import getIssueOverPlace, getIssueTimeLine
from connectors import getIssueAccounts


app = Flask(__name__)
api = Api(app)


@app.route("/")
def homepage():
    return render_template("home.html")


@app.route("/forum")
def forumpage():
    return render_template("forum.html")


@app.route("/details/<string:issueName>")
def detailsPage(issueName):
    summary = getIssueSummary(issueName)[0]
    return render_template("details.html", issue_summary=summary)


class GetSummary(Resource):
    def get(self):
        data = request.get_json()
        return make_response(getIssueSummary(data["issue"]))


class GetIssueOverTime(Resource):
    def get(self):
        data = request.headers.get("issue")
        return make_response(getIssueOverTime(data))


class GetIssueOverPlace(Resource):
    def get(self):
        data = request.headers.get("issue")
        return make_response(getIssueOverPlace(data))


class GetIssueAccount(Resource):
    def get(self):
        data = request.headers.get("issue")
        return make_response(getIssueAccounts(data))


class GetIssueTimeLine(Resource):
    def get(self):
        data = request.headers.get("issue")
        return make_response(getIssueTimeLine(data))


api.add_resource(GetSummary, "/api/summary")
api.add_resource(GetIssueOverTime, "/api/issue/time")
api.add_resource(GetIssueAccount, "/api/issue/account")
api.add_resource(GetIssueTimeLine, "/api/issue/timeline")
api.add_resource(GetIssueOverPlace, "/api/issue/place")


if __name__ == "__main__":
    app.run(debug=True)
