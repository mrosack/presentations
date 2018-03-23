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
import { XAny } from './xAny';


/**
 * A transaction named MakeSmore
 */
export interface MakeSmore {
    /**
     * The class identifier for this type
     */
    _class?: string;
    smoreId: string;
    /**
     * The identifier of an instance of ingredients
     */
    ingredients: Array<XAny>;
    /**
     * The instance identifier for this type
     */
    transactionId?: string;
    timestamp?: Date;
}