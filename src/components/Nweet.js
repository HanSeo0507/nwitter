import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOnwer }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete this nweet?");
		if (ok) {
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			await storageService.refFromURL(nweetObj.attachmentUrl).delete();
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({
			text: newNweet,
		});
		setEditing(false);
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewNweet(value);
	};

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input type="text" placeholder="Edit your Nweet" value={newNweet} onChange={onChange} required />
						<input type="submit" value="Update Nweet" />
					</form>
					<button onClick={toggleEditing}>Cancle</button>
				</>
			) : (
				<>
					<div key={nweetObj.id}>
						<h4>{nweetObj.text}</h4>
						{nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50ox" />}
						{isOnwer && (
							<>
								<button onClick={onDeleteClick}>Delete Nweet</button>
								<button onClick={toggleEditing}>Edit Nweet</button>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Nweet;
