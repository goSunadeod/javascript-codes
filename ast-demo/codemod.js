module.exports = function (fileInfo, api) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators('MM')
    .renameTo('SANWANG')
    .toSource();
};
