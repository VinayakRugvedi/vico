const generateRandomName = () => {
  const possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < 10; i++) {
    name += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length),
    );
  }
  return name;
};

const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomSuffix}`;
};

function generateParticipants(count = 1) {
  const participants = [];
  for (let i = 0; i < count; i++) {
    participants.push({
      name: generateRandomName(),
      id: generateUniqueId(),
    });
  }

  return participants;
}

export { generateParticipants };
