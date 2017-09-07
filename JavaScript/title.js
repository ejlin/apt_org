/******************************************************************************/
/******************************************************************************/
/**                                                                          **/
/**   Name: Eric Lin                                                         **/
/**   Last Modified: September 4th, 2017                                     **/
/**   File Name: title.js                                                    **/
/**   Description: JavaScript file for 'title.html'. Contains the backend    **/
/**   code.                                                                  **/
/**                                                                          **/
/******************************************************************************/
/******************************************************************************/

function create_new_room()
{
  var name = document.getElementById('name_room');
  var name_value = name.value;
  if (name_value == "")
  {
    return;
  }
  var updates = {};
  var d = new Date();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var year = d.getFullYear();
  var day = days[d.getDay()];
  var date = d.getDate();
  var month = d.getMonth();
  month++;
  var random_id = Math.random().toString(36).slice(-8);
  firebase.database().ref('rooms/' + random_id).set({
    room_id: random_id,
    signup_day: "" + month + "/" + date + "/" + year + " : " + day,
    lifestyle_value: [""],
    furniture_value: [""],
    bedroom_value: [""],
    accessories_value: [""],
    miscellaneous_value: [""],
    lifestyle_bool: [""],
    furniture_bool: [""],
    bedroom_bool: [""],
    accessories_bool: [""],
    miscellaneous_bool: [""]
  });
  window.location.href = 'index.html' + '#' + random_id + '#' + name_value;
}

function join_existing_room()
{
  $("#join_existing_room" ).slideDown(500); //.css('overflow', 'visible');
  var button = document.getElementById('join_existing_room_button');
  var input = document.getElementById('join_existing_room');
  var name = document.getElementById('name_room');

  button.onclick = function()
  {
    if (input.value == "" || name.value == "")
    {
      return;
      //button.onclick = //TODO
    }

    firebase.database().ref('rooms/' + input.value).once("value", snapshot => {
      const value = snapshot.val();
      if (value)
      {
       window.location.href = "index.html" + '#' + input.value + '#' + name.value;
      }
    });


  }
}

window.onclick = function(event)
{
  var input = document.getElementById('join_existing_room');
  var button = document.getElementById('join_existing_room_button');
  var name = document.getElementById('name_room')
  if (event.target != input && event.target != button && event.target != name)
  {
    button.onclick = function()
    {
      join_existing_room();
    }
    $("#join_existing_room" ).slideUp(500); //.css('overflow', 'visible');
  }

}