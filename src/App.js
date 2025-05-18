import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Sumit",
    image: "images/sumit-user3.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "Aditya",
    image: "images/aditya-user4.jpg",
    balance: 20,
  },
  {
    id: 499476,
    name: "Ashmit",
    image: "images/ashmit-user2.jpg",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectFriend(selectedFriend ? friend : null);
    setSelectFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className={`sidebar `}>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && (
          <FormAddFriend
            friends={friends}
            setFriends={setFriends}
            onAdd={handleAddFriend}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          f={f}
          name={f.name}
          key={f.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ f, name, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === f?.id;
  return (
    <li className={` ${isSelected ? "selected" : ""}`}>
      <img src={f.image} alt={f.name} width="48" height="48" />
      <h3>{f.name}</h3>

      {f.balance < 0 ? (
        <p className="red">
          You owe {f.name} ₹{Math.abs(f.balance)}
        </p>
      ) : f.balance > 0 ? (
        <p className="green">
          {f.name} owes you ₹{Math.abs(f.balance)}
        </p>
      ) : (
        <p>You and {f.name} are even</p>
      )}
      <Button onClick={() => onSelection(f)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ setFriends, friends, onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAdd(newFriend);

    console.log(newFriend);
    setName("");
    setImage("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a ball with {selectedFriend.name}</h2>

      <label>💸 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧑🏿‍🤝‍🧑🏿 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
