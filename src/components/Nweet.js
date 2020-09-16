import React from "react";

const Nweet = ({ nweetObj, isOnwer }) => (
	<div key={nweetObj.id}>
		<h4>{nweetObj.text}</h4>
		{isOnwer && (
			<>
				<button>Delete Nweet</button>
				<button>Edit Nweet</button>
			</>
		)}
	</div>
);

export default Nweet;
