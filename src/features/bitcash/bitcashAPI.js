// A mock function to mimic making an async request for data
export function fetchData() {
  console.log("test featch")
  return fetch('https://index-api.bitcoin.com/api/v0/history')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  })
}
