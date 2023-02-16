{
  'conditions': [
    ["OS=='win'", {
      "targets": [{
         "target_name": "snow-keyboard",
         "sources": ["keyboard.cc"],
         'include_dirs': [
          "<!(node -p \"require('node-addon-api').include_dir\")",
          "<!@(node -p \"require('napi-thread-safe-callback').include\")"
          ],
         'cflags!': [ '-fno-exceptions' ],
         'cflags_cc!': [ '-fno-exceptions' ],
          'defines': [
            #'NAPI_DISABLE_CPP_EXCEPTIONS',
            "_HAS_EXCEPTIONS=1"
          ],
          "msvs_settings": {
             "VCCLCompilerTool": {
                "ExceptionHandling": 1
              },
          },
       }]  
    }],
    ["OS!='win'", {
      "targets": [{
         "target_name": "snow-keyboard",
         "sources": ["empty.cc"],
        #  'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")"],
        #  'cflags!': [ '-fno-exceptions' ],
        #  'cflags_cc!': [ '-fno-exceptions' ],
        #  'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS', "_HAS_EXCEPTIONS=1" ]
       }]  
    }]
  ]
}
