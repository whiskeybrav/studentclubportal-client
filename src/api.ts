export default class api {
    static baseurl = process.env.WBCLUBSBASEURL;

    static async GET(path: string, data: Record<string, string>) {
        let result = await fetch(api.baseurl + path + "?" + api.buildParamStr(data), {
            method: "GET",
            credentials: "include",
        })
        return await result.json();
    }

    static async POST(path: string, data: Record<string, string>) {
        let result = await fetch(api.baseurl + path, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: api.buildParamStr(data)
        })
        return await result.json();
    }

    private static buildParamStr(data: Record<string, string>): string {
        if (!data) {
            return "";
        }

        var paramStr = "";

        var first = true;
        for (var key in data) {
            var value = data[key];
            if (first) {
                first = false;
            } else {
                paramStr += "&";
            }
            paramStr += key;
            paramStr += "=";
            paramStr += encodeURIComponent(value);
        }

        return paramStr;
    }

    public static parseError(error: string): string {
        switch (error) {
            case "school_unverified":
                return "That school hasn't been verified yet. Check back later."
            case "invalid_school":
                return "That school couldn't be found."
            case "internal_server_error":
                return "An internal server error has occured."
            case "invalid_email":
                return "The email provided doesn't appear to be valid."
            case "missing_params":
                return "Required parameters were missing from the request."
            case "insecure_password":
                return "The password you provided didn't meet the minimum security requirements."
            case "account_exists":
                return "An account with that email address already exists."
            case "display_name_already_used":
                return "A school with that display name already exists."
            case "search_query_too_short":
                return "The search query you provided was too short."
            case "email_not_found":
                return "An account with that email address could not be found."
            case "no_reset_available":
                return "That reset request couldn't be found. It may have expired."
            default:
                return error
        }
    }
}