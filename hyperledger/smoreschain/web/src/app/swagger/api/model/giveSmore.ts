/**
 * LoopBack Application
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * A transaction named GiveSmore
 */
export interface GiveSmore {
    /**
     * The class identifier for this type
     */
    _class?: string;
    smoreId: string;
    recipientCamperId: string;
    /**
     * The instance identifier for this type
     */
    transactionId?: string;
    timestamp?: Date;
}