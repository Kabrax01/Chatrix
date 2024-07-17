import "./addUser.scss";

function AddUser() {
    function handleSearchUser(e) {
        e.preventDefault();
    }

    return (
        <div className="add_user">
            <form onSubmit={handleSearchUser}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    maxLength={20}
                />
                <button>Search</button>
            </form>
            {/* <div className="user">
                <span>John Doe</span>
                <img src="user_list-8.webp" alt="" />
            </div> */}
        </div>
    );
}

export default AddUser;
