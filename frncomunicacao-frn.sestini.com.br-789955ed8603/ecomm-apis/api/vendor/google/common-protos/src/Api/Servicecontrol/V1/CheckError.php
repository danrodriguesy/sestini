<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/api/servicecontrol/v1/check_error.proto

namespace Google\Api\Servicecontrol\V1;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * Defines the errors to be returned in
 * [google.api.servicecontrol.v1.CheckResponse.check_errors][google.api.servicecontrol.v1.CheckResponse.check_errors].
 *
 * Generated from protobuf message <code>google.api.servicecontrol.v1.CheckError</code>
 */
class CheckError extends \Google\Protobuf\Internal\Message
{
    /**
     * The error code.
     *
     * Generated from protobuf field <code>.google.api.servicecontrol.v1.CheckError.Code code = 1;</code>
     */
    private $code = 0;
    /**
     * Free-form text providing details on the error cause of the error.
     *
     * Generated from protobuf field <code>string detail = 2;</code>
     */
    private $detail = '';

    /**
     * Constructor.
     *
     * @param array $data {
     *     Optional. Data for populating the Message object.
     *
     *     @type int $code
     *           The error code.
     *     @type string $detail
     *           Free-form text providing details on the error cause of the error.
     * }
     */
    public function __construct($data = NULL) {
        \GPBMetadata\Google\Api\Servicecontrol\V1\CheckError::initOnce();
        parent::__construct($data);
    }

    /**
     * The error code.
     *
     * Generated from protobuf field <code>.google.api.servicecontrol.v1.CheckError.Code code = 1;</code>
     * @return int
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * The error code.
     *
     * Generated from protobuf field <code>.google.api.servicecontrol.v1.CheckError.Code code = 1;</code>
     * @param int $var
     * @return $this
     */
    public function setCode($var)
    {
        GPBUtil::checkEnum($var, \Google\Api\Servicecontrol\V1\CheckError_Code::class);
        $this->code = $var;

        return $this;
    }

    /**
     * Free-form text providing details on the error cause of the error.
     *
     * Generated from protobuf field <code>string detail = 2;</code>
     * @return string
     */
    public function getDetail()
    {
        return $this->detail;
    }

    /**
     * Free-form text providing details on the error cause of the error.
     *
     * Generated from protobuf field <code>string detail = 2;</code>
     * @param string $var
     * @return $this
     */
    public function setDetail($var)
    {
        GPBUtil::checkString($var, True);
        $this->detail = $var;

        return $this;
    }

}

