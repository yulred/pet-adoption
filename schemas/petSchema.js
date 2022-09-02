const petSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "boolean" },
    dietary: { type: "string" },
    breed: { type: "string" },
    picture: { type: "string" },
    owner: { type: "string" },
  },
}

module.exports = { petSchema };