import { expect } from "chai";
import { EnsDentityClient } from "../src/ens/ens-dentity-client";
import { getTextRecord } from "@ensdomains/ensjs/public";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { createEnsPublicClient, EnsPublicClient } from "@ensdomains/ensjs";

describe("EnsDentityClient", () => {
  let client: EnsDentityClient;
  const ensName = "moisesj.eth";

  beforeEach(async () => {
    // Create the client
    const ensClient: EnsPublicClient = createEnsPublicClient({
      chain: mainnet,
      transport: http(),
    });

    client = await EnsDentityClient.initialize(ensClient, ensName);
  });

  it("should return the correct ENS name", () => {
    expect(client.getEnsName()).to.equal(ensName);
  });

  it("should return the correct ETH address", () => {
    expect(client.getEthAddress()).to.equal(
      "0x222267cdD2d2B10F05999223E5D4b51A6828Ac96"
    );
  });

  it("should throw NotImplementedException for IsPerson", () => {
    expect(() => client.IsPerson()).to.throw(
      "NotImplementedException: IsPerson method is not implemented."
    );
  });

  it("should throw NotImplementedException for IsKyced", () => {
    expect(() => client.IsKyced()).to.throw(
      "NotImplementedException: IsPerson method is not implemented."
    );
  });
});
