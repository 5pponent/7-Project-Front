import axios from 'axios';

function MemberCreate() {
    return(
        <div>
        <h2>Insert New Member</h2>
        <form onSubmit={e => {
            e.preventDefault();
            axios.post("./7-Project/CreateMember", {
            image: e.target.image.value,
            name: e.target.name.value,
            birthday: e.target.birthday.value,
            gender: e.target.gender.value,
            job: e.target.job.value
            })
            .then(function(response) {
            alert("입력 성공");
            })
        }}>
            <p><input type="text" name="image" placeholder="image"/></p>
            <p><input type="text" name="name" placeholder="name"/></p>
            <p><input type="text" name="birthday" placeholder="birthday"/></p>
            <p><input type="text" name="gender" placeholder="gender"/></p>
            <p><input type="text" name="job" placeholder="job"/></p>
            <p><input type="submit" value="Create"/></p>
        </form>
        </div>
    );
}
export default MemberCreate;