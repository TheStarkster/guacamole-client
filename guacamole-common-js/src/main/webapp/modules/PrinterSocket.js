/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


const socket = io(`https://${window.location.hostname}`);

socket.on('show-print', (data) => {
  console.log('--------show-print called--------');
  // Open new tab with Guacamole connection
  // Your string to be encoded
  var connCode = data.split("-")[0]
  let str = `${connCode}\0c\0mysql`;

  console.log(connCode);
  // Convert the string into a Uint8Array of ASCII values
  let byteArray = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    byteArray[i] = str.charCodeAt(i);
  }

  // Convert the Uint8Array into a regular array
  let byteNumbers = Array.from(byteArray);

  // Convert the array into a Blob
  let blob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/octet-stream' });

  // Create a FileReader to read the Blob as a data URL
  let reader = new FileReader();
  reader.onloadend = function () {
    // Once the FileReader has finished, get the result, which is a data URL
    let dataUrl = reader.result;
    // The base64 string is the part of the data URL after the comma
    let base64 = dataUrl.split(',')[1];
    console.log(base64);
    var locationSplitted = window.location.href.split("/")

    console.log(base64.split("=")[0]);
    console.log(locationSplitted[locationSplitted.length - 1]);
    try {
      if (base64.split("=")[0] == locationSplitted[locationSplitted.length - 1].split("?")[0]) {
        window.open(`https://${window.location.hostname}/invoices/${data}`, "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Start reading the Blob as a data URL
  reader.readAsDataURL(blob);
});