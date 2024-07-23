import "./editCurrentUser.scss";

function EditCurrentUser() {
    return (
        <div className="user__edit">
            <form>
                <label htmlFor="avatar">Change user picture</label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/jpeg"
                />
                <label htmlFor="userName">Change user name</label>
                <input type="text" maxLength={25} name="userName" />
            </form>
        </div>
    );
}

export default EditCurrentUser;
