import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
	const [nweet, setNweet] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("nweets").add({
			nweet,
			createdAt: Date.now(),
		});

		setNweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNweet(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
				<input type="submit" value="Nweet" />
			</form>
		</div>
	);
};
export default Home;
