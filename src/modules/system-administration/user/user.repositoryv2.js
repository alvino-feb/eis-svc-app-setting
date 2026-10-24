import prisma from "../../../common/constants/prisma.js";

import { BaseRepositoryV2 } from "../../../common/base/repositoryv2.js";

export default new BaseRepositoryV2(
  prisma.user
);