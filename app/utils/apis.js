const pingapi = `http://ec2-3-91-182-186.compute-1.amazonaws.com:8080/update-device-location`



export function pingDeviceLocation (obj) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(pingapi, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(obj)
  })
}

