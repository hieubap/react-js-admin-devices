export const ENV = "develop";

const LIST_ENVIRONMENT = ["STAGING", "STABLE", "PRODUCTION"];
const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;

if (!LIST_ENVIRONMENT.includes(ENVIRONMENT)) {
  throw Error(`UNSUPPORTED ENVIRONMENT ${ENVIRONMENT}`);
}
