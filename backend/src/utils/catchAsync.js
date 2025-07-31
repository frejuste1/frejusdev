/**
 * Wrapper pour capturer les erreurs asynchrones
 * Évite la répétition de try/catch dans les contrôleurs
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Wrapper pour les méthodes de classe
 */
export const catchAsyncMethod = (target, propertyName, descriptor) => {
  const method = descriptor.value;
  
  descriptor.value = function(...args) {
    const result = method.apply(this, args);
    
    if (result && typeof result.catch === 'function') {
      return result.catch(args[2]); // args[2] est 'next' dans Express
    }
    
    return result;
  };
  
  return descriptor;
};