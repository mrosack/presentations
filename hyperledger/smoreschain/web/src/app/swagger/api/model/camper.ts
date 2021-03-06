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
 * A participant named Camper
 */
export interface Camper {
    /**
     * The class identifier for this type
     */
    _class?: string;
    /**
     * The instance identifier for this type
     */
    camperId: string;
    name: string;
    /**
     * The identifier of an instance of smoresInHand
     */
    smoresInHand: Array<XAny>;
    /**
     * The identifier of an instance of smoresInBelly
     */
    smoresInBelly: Array<XAny>;
}
