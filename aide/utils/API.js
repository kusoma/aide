const GRAPHQL = "http://192.168.56.1:3000/api?";
//192.168.56.1

async function callGraphql(request, callback) {
  console.log("def");
  fetch(GRAPHQL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log("status");

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      callback(data);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

module.exports.callGraphql = callGraphql;
