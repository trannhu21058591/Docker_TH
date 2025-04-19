from graphviz import Digraph

dot = Digraph(format='png')
dot.attr(rankdir='LR', size='10')

# Node: Client và API Gateway
dot.node('Client', 'Client\n(Postman / Web UI)', shape='box', style='filled', fillcolor='lightblue')
dot.node('Gateway', 'API Gateway\n(port 3000)', shape='box', style='filled', fillcolor='lightgray')

# Node: Services
dot.node('Product', 'Product Service\n(port 3001)', shape='box', style='filled', fillcolor='lightyellow')
dot.node('Order', 'Order Service\n(port 3002)', shape='box', style='filled', fillcolor='lightyellow')
dot.node('Customer', 'Customer Service\n(port 3003)', shape='box', style='filled', fillcolor='lightyellow')

# Node: MongoDBs
dot.node('ProductDB', 'MongoDB\n(productdb)\n(port 27017)', shape='cylinder', style='filled', fillcolor='mistyrose')
dot.node('OrderDB', 'MongoDB\n(orderdb)\n(port 27018)', shape='cylinder', style='filled', fillcolor='mistyrose')
dot.node('CustomerDB', 'MongoDB\n(customerdb)\n(port 27019)', shape='cylinder', style='filled', fillcolor='mistyrose')

# Connections
dot.edge('Client', 'Gateway')
dot.edge('Gateway', 'Product')
dot.edge('Gateway', 'Order')
dot.edge('Gateway', 'Customer')

# Internal calls
dot.edge('Order', 'Product', style='dashed', label='fetch product')
dot.edge('Order', 'Customer', style='dashed', label='verify customer')

# Service → DB
dot.edge('Product', 'ProductDB')
dot.edge('Order', 'OrderDB')
dot.edge('Customer', 'CustomerDB')

# Xuất file
dot.render('microservices-architecture-diagram', view=True)
