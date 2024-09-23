import { EnsPublicClient } from "@ensdomains/ensjs";
import { getTextRecord } from "@ensdomains/ensjs/public";

/**
 * An ENS Dentity Client abstracts any interactions with the Federated Token and all OIDC related operations.
 */
export class EnsDentityClient {
  private _client: EnsPublicClient;
  private _ensName: string;
  private _ethAddress: string;

  /**
   * Private constructor to initialize the EnsDentityClient instance.
   * @param {string} ensName - The ENS name.
   * @param {string} ethAddress - The Ethereum address associated with the ENS name.
   * @param {EnsPublicClient} ensPublicClient - The ENS public client instance.
   */
  private constructor(
    ensName: string,
    ethAddress: string,
    ensPublicClient: EnsPublicClient
  ) {
    this._ensName = ensName;
    this._ethAddress = ethAddress;
    this._client = ensPublicClient;
  }

  /**
   * Static method to initialize the EnsDentityClient instance asynchronously.
   * @param {EnsPublicClient} client - The ENS public client instance.
   * @param {string} ensName - The ENS name.
   * @returns {Promise<EnsDentityClient>} A promise that resolves to an EnsDentityClient instance.
   */
  public static async initialize(
    client: EnsPublicClient,
    ensName: string
  ): Promise<EnsDentityClient> {
    // Get ENS owning ETH address
    const ethAddress = await client.getAddressRecord({ name: ensName });
    return new EnsDentityClient(ensName, ethAddress!.value, client);
  }

  /**
   * Get the ENS name.
   * @returns {string} The ENS name.
   */
  public getEnsName(): string {
    return this._ensName;
  }

  /**
   * Get the Ethereum address associated with the ENS name.
   * @returns {string} The Ethereum address.
   */
  public getEthAddress(): string {
    return this._ethAddress;
  }

  public IsPerson(): boolean {
    throw new Error(
      "NotImplementedException: IsPerson method is not implemented."
    );
  }

  public IsKyced(): boolean {
    throw new Error(
      "NotImplementedException: IsPerson method is not implemented."
    );
  }

  public async getBasicVerifications(): Promise<[]> {
    // Fetch Federated Token
    const verifications = await getTextRecord(this._client, {
      name: this._ensName,
      key: 'verifications',
    });

    console.log('FederatedToken', verifications);

    // Parse it
    // Look at ENS specification for storage from Luc

    // Validate VP

    throw new Error(
      "NotImplementedException: getBasicVerifications method is not implemented."
    );
  }
}
