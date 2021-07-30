module.exports = function (fileInfo, api) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators('guobao')
    .renameTo('kaijun')
    .toSource();
};
