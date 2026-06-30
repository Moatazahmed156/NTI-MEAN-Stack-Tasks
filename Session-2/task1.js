const bookedSlots = ["a1", "b3"];

function bookAppointment(slot) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bookedSlots.includes(slot)) {
        reject(`Slot ${slot} is already booked.`);
      } else {
        bookedSlots.push(slot);
        resolve(`Appointment booked successfully for slot ${slot}.`);
      }
    }, 1000);
  });
}
async function makeBooking(slot) {
  try {
    const message = await bookAppointment(slot);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

makeBooking("c2"); // Success
makeBooking("b3"); // Rejected