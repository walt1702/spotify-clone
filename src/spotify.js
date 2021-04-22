export const authEndpoint = 
"https://accounts.spotify.com/authorize";

const redirectUrl = "https://spotify-clone-puce.vercel.app/";
//const redirectUrl = "http://localhost:3000/";
const clientId = "d9c8fd3abdc34f11aae981829eeeceb9";

const scopes = [
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-read-playback-state",
	"user-top-read",
	"user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}
&response_type=token&show_dialogue=false`;

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
