# PAYMENT SDK SAMPLE API DOC

## Setup Tenant
1. **Get SetupTenant Fields**

    Description
    ```
    ```

    Request URL

       http://localhost:3007/setup_tenant/get_setup_fields

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/setup_tenant/get_setup_fields' \
        -H 'accept: */*' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -d ''
    ```

    Response
    ```json
    {
	  "tenant_form": {
	    "title": "Add SamplePay Gateway Configuration",
	    "sections": [
	      {
	        "type": "row",
	        "fields": [
	          {
	            "account_name": {
	              "display": "Account Name",
	              "id": "account_name",
	              "type": "text",
	              "required": true,
	              "placeholder": "Account Name",
	              "name": "gateway[account_name]"
	            }
	          },
	          {
	            "client_id": {
	              "display": "Client ID",
	              "id": "client_id",
	              "type": "text",
	              "required": true,
	              "placeholder": "Client ID",
	              "tooltipText": "Client ID can be obtained from SamplePay dashboard under API tab",
	              "name": "gateway[client_id]"
	            }
	          },
	          {
	            "secret_key": {
	              "display": "Secret Key",
	              "id": "secret_key",
	              "type": "password",
	              "required": true,
	              "placeholder": "xxxxxxxxxxxxxx",
	              "tooltipText": "Secret Key can be obtained from SamplePay dashboard under API tab",
	              "name": "gateway[secret_key]",
	              "autocomplete": "new-password"
	            }
	          },
	          {
	            "gateway_name": {
	              "display": "",
	              "id": "gateway_name",
	              "type": "hidden",
	              "value": "SamplePay",
	              "required": true,
	              "placeholder": "SamplePay",
	              "name": "gateway[name]"
	            }
	          },
	          {
	            "environment": {
	              "display": "Enable Test Mode",
	              "id": "environment",
	              "type": "toggle",
	              "required": true,
	              "defaultValue": true,
	              "name": "gateway[env]"
	            }
	          }
	        ]
	      },
	      {
	        "sections": [
	          {
	            "type": "column",
	            "class": "col-lg-3 padding-zero",
	            "fields": [
	              {
	                "add_card": {
	                  "display": "Connect",
	                  "type": "button",
	                  "class": "btn-primary",
	                  "submitButton": true
	                }
	              },
	              {
	                "cancel_card": {
	                  "display": "Cancel",
	                  "type": "button",
	                  "class": "btn-secondary",
	                  "submitButton": false
	                }
	              }
	            ]
	          }
	        ]
	      }
	    ]
	  }
	}
    ```
    ---
2. **Register Payment Gateway**

    Description
    ```
    ```

    Request URL

        http://localhost:3007/setup_tenant/register_payment_gateway

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/setup_tenant/register_payment_gateway' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
        "account_id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZDVkMz.....",
        "client_id": "abc12345"
        }'
    ```
    PayLoad
    ```json
    {
        "account_id": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz.......", // Here account_id is nothing but secret key
        "client_id": "abc12345"
    }
    ```

    Response
    ```json
    {
        "type": "account",
        "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz.......",
        "client_id": "abc12345"
    }
    ```
---

## Payment Method

1. **Add Card Payment Method**

    Description
    ```
    ```

    Request URL

        http://localhost:3007/payment_methods/add_payment_method

    
    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/payment_methods/add_payment_method' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
            "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz...",
                    "client_id": "abc12345"
                }
            },
            "customer_config": {
                "name": "SamplePayCustomer",
                "id": "C-00036",
                "company": "SEPTEST",
                "status": "active",
                "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
                "email": "test@ordwaylabs.com",
                "phone": "",
                "addresses": [
                    {
                        "city": "",
                        "state": null,
                        "line1": "",
                        "line2": "",
                        "postal": "",
                        "country": "United States of America",
                        "label": "CT-00036"
                    }
                ],
                "gateway_id": ""
            },
            "params": {
                "card": {
                    "name": null,
                    "number": null,
                    "month": null,
                    "year": null,
                    "cvd": null,
                    "cvd_indicator": 1,
                    "last4": null,
                    "brand": null,
                    "token": "LNm8w0ql08LYw0lq" 
                },
                "customer": {
                    "name": "SamplePayCustomer",
                    "phone": "",
                    "address": {
                        "state": null,
                        "city": null,
                        "country": null,
                        "postal": null,
                        "line1": null,
                        "line2": null
                    }
                },
                "type": "Credit Card",
                "default": "true"
            }
        }'
    ```

    Payload

    ```json
    {
        "gateway_config": {
            "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config": {
                "type": "account",
                "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz......",
                "client_id": "abc12345"
            }
        },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": ""
        },
        "params": {
            "card": {
                "name": null,
                "number": null,
                "month": null,
                "year": null,
                "cvd": null,
                "cvd_indicator": 1,
                "last4": null,
                "brand": null,
                "token": "LNm8w0ql08LYw0lq" // Credit Card Token (from the iframe)
            },
            "customer": {
                "name": "SamplePayCustomer",
                "phone": "",
                "address": {
                    "state": null,
                    "city": null,
                    "country": null,
                    "postal": null,
                    "line1": null,
                    "line2": null
                }
            },
            "type": "Credit Card",
            "default": "true"
        }
    }
    ```

    Response
    ```json
    {
        "gateway_id": "KNDnpVNKMDjNVA4j",
        "method": {
            "uuid": "a4b7b413-cfee-4500-8bdb-150f77e88316",
            "name": "SamplePayCustomer",
            "last4": "1111",
            "method_type": 0,
            "token_id": "LNm8w0ql08LYq", // This token_id is the Paymnet Method ID which is passed in the payment create api
            "brand": "Visa",
            "month": "08",
            "year": "2028",
            "status": "verified",
            // The below opt will be vary for each gateway
            "opt": {},
            "default": 1
        }
    }
    ```
    ---
2. **Add Bank Payment Method**
   
    Description
    ```
    ```

    Request URL

        http://localhost:3007/payment_methods/add_payment_method


    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/payment_methods/add_payment_method' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
            "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz.....",
                    "client_id": "abc12345"
                }
            },
            "customer_config": {
                "name": "SamplePayCustomer",
                "id": "C-00036",
                "company": "SEPTEST",
                "status": "active",
                "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
                "email": "test@ordwaylabs.com",
                "phone": "",
                "addresses": [
                    {
                        "city": "",
                        "state": null,
                        "line1": "",
                        "line2": "",
                        "postal": "",
                        "country": "United States of America",
                        "label": "CT-00036"
                    }
                ],
                "gateway_id": "ADjPnVDAn"
            },
            "params": {
                "ach": {
                    "customer_id": null,
                    "account_number": "1234567890123451",
                    "routing_number": "021000021",
                    "bank_account_type": null,
                    "ach_type": null,
                    "year": null,
                    "plaid_token": null,
                    "ach_token": null,
                    "ach_verification_method": null,
                    "sec_code": "WEB",
                    "first_name": "John",
                    "last_name": "Watson",
                    "account_type": "Personal Savings"
                },
                "customer": {
                    "name": "SamplePayCustomer",
                    "phone": "",
                    "address": {
                        "state": null,
                        "city": null,
                        "country": null,
                        "postal": null,
                        "line1": null,
                        "line2": null
                    }
                },
                "type": "Bank Account",
                "default": "true"
            }
        }'
    ```

    payload
    ```json
    {
        "gateway_config": {
            "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config": {
                "type": "account",
                "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZDVk.....",
                "client_id": "abc12345"
            }
        },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNj"
        },
        "params": {
            "ach": {
                "customer_id": null,
                "account_number": "1234567890123451",
                "routing_number": "021000021",
                "bank_account_type": null,
                "ach_type": null,
                "year": null,
                "plaid_token": null,
                "ach_token": null,
                "ach_verification_method": null,
                "sec_code": "WEB",
                "first_name": "John",
                "last_name": "Watson",
                "account_type": "Personal Savings"
            },
            "customer": {
                "name": "SamplePayCustomer",
                "phone": "",
                "address": {
                    "state": null,
                    "city": null,
                    "country": null,
                    "postal": null,
                    "line1": null,
                    "line2": null
                }
            },
            "type": "Bank Account",
            "default": "true"
        }
    }
    ```

    Response
    ```json
    {
        "gateway_id": "ADjPnVDAnNjMV",
        "method": {
            "uuid": "aad60e69-b9a3-4b12-a012-224b18d2318c",
            "last4": "3451",
            "method_type": 1,
            "token_id": "5ej64K456e4", // This token_id is the Paymnet Method ID which is passed in the payment create api
            "brand": "Bank Account",
            "status": "verified",
            "first_name": "John",
            "last_name": "Watson",
            // The below opt will be vary for each gateway
            "opt": {},
            "default": true
        }
    }
    ```
    ---
3. **Delete Payment Method**
       
    Description
    ```
    ```

    Request URL

        http://localhost:3007/payment_methods/delete_payment_method


    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
    'http://localhost:3007/payment_methods/delete_payment_method' \
    -H 'accept: */*' \
    -H 'x-test-mode: true' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
    -H 'Content-Type: application/json' \
    -d '{
        "gateway_config": {
            "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config": {
                "type": "account",
                "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZDVkMzc......",
                "client_id": "abc12345"
            }
        },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNjMN"
        },
        "methods": [
            "N2P10Mv1Pm9m0m9y"
        ],
        "method_types": {
            "N2P10Mv1Pm9m0m9y": "credit_card"
        }
    }'
    ```
    ---

## Payment

1. Create Payment

    Description
    ```
    ```
    Request URL

        http://localhost:3007/payment_methods/delete_payment_method

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request:
    ```c
    curl -X 'POST' \
        'http://localhost:3007/payments/create_payment' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
            "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ....",
                    "client_id": "abc12345"
                }
            },
            "customer_config": {
                "name": "SamplePayCustomer",
                "id": "C-00036",
                "company": "SEPTEST",
                "status": "active",
                "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
                "email": "test@ordwaylabs.com",
                "phone": "",
                "addresses": [
                    {
                        "city": "",
                        "state": null,
                        "line1": "",
                        "line2": "",
                        "postal": "",
                        "country": "United States of America",
                        "label": "CT-00036"
                    }
                ],
                "gateway_id": "ADjPnVDAnNjMVpMN"
            },
            "method": {
                "uuid": "3dad3740-b4f4-4210-bb1d-88d884785ae1",
                "method_type": "credit_card",
                "token_id": "vmy905Nv5L9y0M2L",
                "last4": "1111",
                "brand": "Visa",
                "year": 2028,
                "month": 8,
                "default": true,
                "opt": {
                    "id": "vmy905Nv5L9y0M2L",
                    "zip": "12345",
                    "city": null,
                    "type": "card",
                    "brand": "V",
                    "state": null,
                    "token": "mLY0wm8qm0ELw8ql",
                    "object": "Card",
                    "address": {
                        "zip": "12345"
                    },
                    "country": null,
                    "address1": null,
                    "address2": null,
                    "bank_name": null,
                    "card_type": "",
                    "avs_status": "N",
                    "bank_phone": null,
                    "created_at": 1761214798,
                    "cvc_status": "M",
                    "updated_at": 1761214802,
                    "bin_country": "",
                    "card_source": "INTERNET",
                    "customer_id": "ADjPnVDAnNjMVpMN",
                    "fingerprint": "m20yPPv95v1yy50M",
                    "first6digit": 411111,
                    "bank_website": null,
                    "zip_check_passed": 0,
                    "address_check_passed": 0
                },
                "profile_id": "45572740-e698-446c-95a5-1823fb987f93",
                "status": "verified"
            },
            "payment_uid": "PMT-00052",
            "amount": 12000,
            "currency": "USD",
            "description": null,
            "statement_descriptor": null,
            "options": {
                "ordway_customer_id": "C-00036",
                "ordway_payment_id": "PMT-00052",
                "ordway_company": "SEPTEST",
                "email_status": false
            }
        }'
    ```

    Payload
    ```json
    {
        "gateway_config": {
            "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config": {
                "type": "account",
                "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMz....",
                "client_id": "abc12345"
            }
        },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNjMVpMN"
        },
        "method": {
            "uuid": "3dad3740-b4f4-4210-bb1d-88d884785ae1",
            "method_type": "credit_card",
            "token_id": "vmy905Nv5L9y0M2L",
            "last4": "1111",
            "brand": "Visa",
            "year": 2028,
            "month": 8,
            "default": true,
            "opt": {},
            "profile_id": "45572740-e698-446c-95a5-1823fb987f93",
            "status": "verified"
        },
        "payment_uid": "PMT-00052",
        "amount": 12000,
        "currency": "USD",
        "description": null,
        "statement_descriptor": null,
        "options": {
            "ordway_customer_id": "C-00036",
            "ordway_payment_id": "PMT-00052",
            "ordway_company": "SEPTEST",
            "email_status": false
        }
    }
    ```

    Response
    ```json
    {
        "amount": 12000,
        "fees": 0,
        "gateway_resp": {},
        "method": {
            "uuid": "3dad3740-b4f4-4210-bb1d-88d884785ae1",
            "method_type": "credit_card",
            "token_id": "vmy905Nv5L9y0M2L",
            "last4": "1111",
            "brand": "Visa",
            "year": "2028",
            "month": "8",
            "default": "true",
            "opt": {},
            "profile_id": "45572740-e698-446c-95a5-1823fb987f93",
            "status": "verified"
        },
        "status": "pending",
        "transaction_ref": "obLyORXoWXDMbOWn",
        "failure_reason": null
    }
    ```
    ---
2. Reconcile Payment

    Description
    ```
    ```
    Request URL

        http://localhost:3010/adyen/payments/reconcile_payment

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```
    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/payments/reconcile_payment' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
            "gateway_config" :
            {
                "tenant_uid" : "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config" :
            {
                    "type" : "account",
                    "secret_key" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ...",
                    "client_id" : "abc12345"
                }
            },
            "payments" : [
                "obLyORXoWXDMbOWn"
            ]
        }'
    ```
    
    payload
    ```json
    {
        "gateway_config" :
        {
            "tenant_uid" : "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config" :
            {
                "type" : "account",
                "secret_key" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZ.....",
                "client_id" : "abc12345"
            }
        },
        "payments" : [
            "obLyORXoWXDMbOWn"
        ]
    }
    ```
    
    Response
    ```json
    [
        {
            "amount": 12000,
            "fees": 0,
            "gateway_resp": {},
            "status": "pending",
            "transaction_ref": "obLyORXoWXDMbOWn",
            "failure_reason": null
        }
    ]
    ```
    ---
3. Get Payment

    Description
    ```
    ```
    Request URL

        http://localhost:3010/adyen/payments/get_payment

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
        'http://localhost:3007/payments/get_payment' \
        -H 'accept: */*' \
        -H 'x-test-mode: true' \
        -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc' \
        -H 'Content-Type: application/json' \
        -d '{
            "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ....",
                    "client_id": "abc12345"
                }
            },
            "customer_config": {
                "name": "SamplePayCustomer",
                "id": "C-00036",
                "company": "SEPTEST",
                "status": "active",
                "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
                "email": "test@ordwaylabs.com",
                "phone": "",
                "addresses": [
                    {
                        "city": "",
                        "state": null,
                        "line1": "",
                        "line2": "",
                        "postal": "",
                        "country": "United States of America",
                        "label": "CT-00036"
                    }
                ],
                "gateway_id": "ADjPnVDAnNjMVpMN"
            },
            "transaction_ref": "obLyORXoWXDMbOWn"
        }'
    ```

    payload
    ```json
    {
        "gateway_config": {
            "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
            "tenant_config": {
                "type": "account",
                "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ....",
                "client_id": "abc12345"
            }
        },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNjMVpMN"
        },
        "transaction_ref": "obLyORXoWXDMbOWn"
    }
    ```

    Response
    ```json
    {
        "amount": 12000,
        "fees": 0,
        "gateway_resp": {},
        "status": "pending",
        "transaction_ref": "obLyORXoWXDMbOWn",
        "failure_reason": null
    }  
    ```

4. Refund
    Description
    ```
    ```
    Request URL

        http://localhost:3008/payments/refund_payment

    Headers
    ```
    1. Content-Type: application/json
    2. x-test-mode: true 
    3. Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiI4MjEzZDBiNC0xY2JlLTRhNmItYjE1MC0yNzZjZjYzYmM2NzciLCJleHAiOjE3NjEyOTE5MzZ9.Oerd9tC_uesV67f7zESrSxm5nbZZPCeAX0luFPXQiZc
    ```

    Request
    ```c
    curl -X 'POST' \
    'http://localhost:3008/payments/refund_payment' \
    -H 'accept: */*' \
    -H 'x-test-mode: true' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRfaWQiOjEsInVzZXJfaWQiOiJmZTE3ZWRiZC02ODBmLTRjNGItYTBmYS1hYjA4YTQ2MWIyNDQiLCJleHAiOjE3NjEzMTE0MDB9.rZ7t-8W8chQec6rJYoiL_ZaKg4PRv5KBq1qFbFoU15c' \
    -H 'Content-Type: application/json' \
    -d '{
        "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ....",
                    "client_id": "abc12345"
                }
            },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNjMVpMN"
        },
        "transaction_ref": "200104635462",
        "payment_uid": "PMT-00053",
        "currency": "USD",
        "refund_uid": "REF-00002",
        "amount": 11000,
        "refund_note": null,
        "reason": null,
        "options": {}
    }'
    ```

    payload
    ```json
    {
        "gateway_config": {
                "tenant_uid": "91644f60-9b80-4be3-b9fe-5f4ab99e7912",
                "tenant_config": {
                    "type": "account",
                    "secret_key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImZiODEzODMzZ....",
                    "client_id": "abc12345"
                }
            },
        "customer_config": {
            "name": "SamplePayCustomer",
            "id": "C-00036",
            "company": "SEPTEST",
            "status": "active",
            "uuid": "4d38863c-32e6-40c3-a416-29455c614ec8",
            "email": "test@ordwaylabs.com",
            "phone": "",
            "addresses": [
                {
                    "city": "",
                    "state": null,
                    "line1": "",
                    "line2": "",
                    "postal": "",
                    "country": "United States of America",
                    "label": "CT-00036"
                }
            ],
            "gateway_id": "ADjPnVDAnNjMVpMN"
        },
        "transaction_ref": "200104635462",
        "payment_uid": "PMT-00053",
        "currency": "USD",
        "refund_uid": "REF-00002",
        "amount": 11000,
        "refund_note": null,
        "reason": null,
        "options": {}
    }
    ```

    Response
    ```json
    {
        "status": "processed",
        "transaction_ref": "200104634580",
        "amount": 11000,
        "fees": 0,
        "gateway_resp": {}
    }
    ```