const petSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    picture: { type: "string" },
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergenic: { type: "boolean" },
    dietary: { type: "array" },
    breed: { type: "string" },
  },
}

module.exports = { petSchema };