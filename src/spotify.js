export const authEndpoint = 
"https://accounts.spotify.com/authorize";

const redirectUrl = process.env.NODE_ENV === "development" ?"http://localhost:3000/" : "https://spotify-clone-puce.vercel.app/";

const clientId = "d9c8fd3abdc34f11aae981829eeeceb9";

const scopes = [
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-read-playback-state",
	"user-top-read",
	"user-modify-playback-state",
	"user-follow-read",
	"user-library-read",
	"user-follow-modify",
	"playlist-read-private",
	"playlist-read-collaborative",
	"playlist-modify-public",
	"playlist-modify-private"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}
&response_type=token&show_dialog=true`;

//http://localhost:3000/#access_token=BQCpAazVpKQZSLxxl-teii0IIxTULd9FCNjBEQUw5NUpNwe5nQqYv3DSBT6QT8NU8zh3b-dlHiwK1V3sPEi418LaWj__1JSZ071IicsZULdjd7YLGc4NJJLtquVMMJmqdU_bHUZ78GfPaOr5EuJIhPl2HY4YNq_jWEUTP2FkUptsDztdXAGF&token_type=Bearer&expires_in=3600

export const getTokenFromUrl = () =>{
	return window.location.hash
		.substring(1)
		.split("&")
		.reduce((initial,item)=>{
			var parts = item.split("=");
			initial[parts[0]] = decodeURIComponent(parts[1]);

			return initial;
		},{});
};
