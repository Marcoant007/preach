import jwt from "jsonwebtoken";
import Config from "../config/Config";

class TokenUtil {
    public async generateToken(params = {}){
        return jwt.sign(params, "6af628bcf43271e8ba377d80534653b1", {
            expiresIn: "1d"
        })
    }
}

export {TokenUtil}