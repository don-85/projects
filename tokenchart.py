import matplotlib.pyplot as plt

# Token Distribution data from the given Tokenomics section
labels = ['Liquidity Pool', 'Development Fund', 'Community Rewards', 'Marketing and Partnerships', 'Team Reserve']
sizes = [30, 20, 25, 15, 10]  # Corresponding percentages for each category
colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99','#c2c2f0']  # Different colors for each segment

fig1, ax1 = plt.subplots()
ax1.pie(sizes, colors=colors, labels=labels, autopct='%1.1f%%', startangle=90)
ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

plt.title('RVNL Token Distribution')
plt.show()
